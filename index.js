const fs = require('fs');
const sizzleCode = fs.readFileSync(require.resolve('sizzle'));

const getElementBySizzle = eval("(selector) => { \n" + sizzleCode + "\n const elements = Sizzle(selector); console.log('Count of elements fetched', elements.length); return elements }");

function css3Assert(instance) {

  const assertElementPresent = async (selector) =>{
    try {
      const element = await instance.evaluateHandle(
        getElementBySizzle,
        selector,
      );
      if (Array.isArray(element) && element.length > 0 && element[0].asElement()) {
        return true
      } else {
        throw new Error('an element with selector: "'+ selector+ '" not found');
      }
    } catch (error) {
      throw error
    }

  };

  const getElement = async (selector) => {
    return await instance.evaluateHandle(
      getElementBySizzle,
      selector,
    );
  };

  return {
    assertElementPresent: assertElementPresent,
    getElement: getElement
  };
}



module.exports = css3Assert;

