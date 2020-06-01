const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

// en caso de que tu lambda esté enotra region 
// reemplazar por el código de la línea 2 poniendo la region necesaria
/*const lambda = new AWS.Lambda({
    region: 'us-east-1'
});*/

const exFunction = (params) => {
    return new Promise((resolve, reject) => {
        lambda.invoke(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);

        let params = {
            FunctionName: 'arn:aws:lambda:REGION:ID_ACCOUN:function:LambdaAccountA',
            Payload: ''
        };

        let response = await exFunction(params);

        console.log('Response Bontu Lambda: ', response);

        return {
            'statusCode': 200,
            'body': response
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
