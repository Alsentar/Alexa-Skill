const Alexa = require('ask-sdk-core');

const GetDailyTipIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'GetDailyTipIntent';
    },
    handle(handlerInput) {
        const tips = [
            'Nunca dejes de aprender.',
            'La disciplina es clave para el éxito.',
            'Aprovecha el día, haz algo productivo.',
            'El descanso es tan importante como el trabajo.'
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        return handlerInput.responseBuilder
            .speak(randomTip)
            .getResponse();
    },
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Bienvenido a Consejo Diario. Pídeme un consejo y te lo daré.')
            .reprompt('¿Te gustaría un consejo?')
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Puedes pedirme un consejo diciendo, dame un consejo.')
            .reprompt('¿Cómo puedo ayudarte?')
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
               (request.intent.name === 'AMAZON.CancelIntent' ||
                request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Adiós!')
            .getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('Lo siento, hubo un problema. Inténtalo de nuevo.')
            .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetDailyTipIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
