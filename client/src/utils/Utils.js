import * as Speech from "expo-speech";

export default class Utils {
    static speak = (
        thingToSay = '',
        options = {
        rate: 0.8,
        language: 'pt-BR'
    }) => {
        Speech.speak(thingToSay, options);
    };

    static validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    static removeTitleAndMessage(obj) {
      if (obj.hasOwnProperty('title')) {
        delete obj.title;
      }

      if (obj.hasOwnProperty('message')) {
        delete obj.message;
      }

      return obj;
    }
}