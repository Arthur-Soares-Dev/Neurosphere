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
}