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

// type TypeAgrgs<T extends object> = ({
//   [property in keyof T]: T[property] | [T[property], string];
// })

// export const composeInitialState = <T extends object>(obj: T): { [property in keyof T]: T[property] | [T[property], string]} => {
// export const composeInitialState = <T extends object>(obj: TypeAgrgs<T>) => {
export const composeInitialState = <T extends object>(obj: { [property in keyof T]: T[property] | [T[property], string] }) => {
  let initialState = {} as T;
  let names = {} as { [property in keyof T]: keyof T };
  let labels = {} as { [property in keyof T]: string };

  Object.entries(obj).forEach(x => {
    let key = x[0] as keyof T;
    let value = x[1] as T[keyof T];
    let property = "";

    let newKey;

    if (Array.isArray(value)) {
      property = value[1];
      value = value[0];
    } else {
      newKey = key.toString();

      if (newKey.startsWith("is")) {
        property = newKey.replace(newKey, newKey.slice(2));
      }

      if (newKey.startsWith("has")) {
        property = newKey.replace(newKey, newKey.slice(3));
      }

      if (newKey.endsWith("Id")) {
        let val = newKey.replace(newKey.slice(-2), "");
        property = covertToTitleCase(val);
      }

      if (newKey == "id") {
        property = newKey.toUpperCase();
      }
    }

    initialState[key] = value;
    names[key] = key;
    labels[key] = property == "" ? covertToTitleCase(newKey) : property;
  });

  return [
    initialState,
    names,
    labels
  ];
};