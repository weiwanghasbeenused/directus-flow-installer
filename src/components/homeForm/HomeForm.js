'use client'

import Form from '@/components/formElements/form/Form.js'
import Input from '@/components/formElements/input/Input.js'
import Button from '@/components/formElements/button/Button.js'
import fields from '@/config/form_config.js'
import flowMaintainer from '@/lib/flowMaintainer.js'
import './homeForm.css'

export default function HomeForm({flows_json, operations_json, config_json, relations_json}){
    async function submit(e){
        e.preventDefault();
        const form_data = new FormData(e.target);
        const request_url_base = form_data.get('request_url');
        const access_token = form_data.get('access_token');
        flowMaintainer.init(request_url_base, access_token, flows_json, operations_json, config_json, relations_json);
        flowMaintainer.start();
        // try {
        //     const result = await flowMaintainer.start();
        //     console.log(result);  // This will log the success message.
        //     if(result['status'] === 1) {
        //         alert('flows and opertions are created successfully!');
        //     }
        //     // Follow-up actions can go here
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    }

    return (
        <Form onSubmit={submit}>
            { fields.map((field)=>{
                if(field['type'] === 'input') {
                    return <Input key={`field-${field['name']}`} name={field['name']} description={field['description']} placeholder={field['placeholder'] ? field['placeholder'] : null}></Input>
                } else {
                    return  null;
                }
            }) }
            <Button text="INSTALL"></Button>
        </Form>
    )
}