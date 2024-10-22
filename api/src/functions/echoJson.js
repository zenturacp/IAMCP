const { app } = require('@azure/functions');

app.http('echoJson', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const body = await request.json();

        return { 
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});
