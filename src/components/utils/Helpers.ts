const covertToTitleCase = (str: string) => {
  let strArr = [];
  let startPos = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] == str[i].toUpperCase()) {
      let val = str.slice(startPos, i);
      strArr.push(val);
      startPos = i;
    }
  }

  strArr.push(str.slice(startPos));
  let newStr = strArr.join(" ");
  let finalStr = newStr.replace(newStr[0], newStr[0].toUpperCase());

  return finalStr;
};

export const composeInitialState = <T extends object>(obj: T) => {
  let initialState = {} as T;
  let names = {};
  let labels = {};


};