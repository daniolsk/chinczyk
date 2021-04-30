export default class Speaker {
    speak(text) {
        const utterance = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(utterance)
    }
}