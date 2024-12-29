const fields = [
        {
            'type': 'input',
            'name': 'request_url',
            'description': 'Please enter the Directus API URL',
            'placeholder': 'http://0.0.0.0:8055'
        },
        {
            'type': 'input',
            'name': 'access_token',
            'description': 'Please enter the access token of the user. The user must have permission to create and update flows and operations'
            // 'placeholder': ''
        }
]

export default fields;