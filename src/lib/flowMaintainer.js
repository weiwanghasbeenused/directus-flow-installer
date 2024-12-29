import config from '@/config/flows_config.js';
// function createOperations
const flowMaintainer = {
    request_url_base: '',
    access_token: '',
    flows_json: [],
    flows: [],
    operations_json: [],
    operations: [],
    relations_json: [],
    config_json: null,
    response: {
        'status': 0,
        'body': ''
    },
    init: function(request_url_base, access_token, flows_json, operations_json, config_json, relations_json){
        this.request_url_base = request_url_base;
        this.access_token = access_token;
        this.flows_json = typeof flows_json === 'string' ? JSON.parse(flows_json) : flows_json;
        this.operations_json = typeof operations_json === 'string' ? JSON.parse(operations_json) : operations_json;
        this.relations_json = typeof relations_json === 'string' ? JSON.parse(relations_json) : relations_json;
        this.config_json = typeof config_json === 'string' ? JSON.parse(config_json) : config_json;
    },
    start: async function(){
        this.create('collections', this.config_json).then(()=>{
            for(const r of this.relations_json) {
                this.create('relations', r);
            }
        });
        
        await this.create('flows', this.flows_json).then((data)=>{
            this.flows = data;
            const promises = [];

            for(const process of config) {
                let this_flow = '';
                for(const flow of this.flows) {
                    if(flow['name'] === process['flow']) this_flow = flow;
                }
                const opts = [];
                for(const opt of this.operations_json) {
                    if(!process['operations'].includes(opt['name'])) continue;
                    opts.push({...opt, 'flow': this_flow['id']})
                }

                const opPromise = this.create('operations', opts).then((data)=>{
                    data.sort((a,b)=>{
                        return process['operations'].indexOf(a['name']) > process['operations'].indexOf(b['name']) ? 1 : -1;
                    })
                    return this.update('flows', this_flow['id'], { 'operation': data[0]['id'] }).then(()=>{
                        const updatePromises = [];
                        for(let i = 0; i < data.length - 1; i++) {
                            updatePromises.push(this.update('operations', data[i]['id'], {
                                'resolve': data[i+1]['id']
                            }));
                        }
                        return Promise.all(updatePromises);
                    })
                    
                    
                })
                promises.push(opPromise);
            }

            return Promise.all(promises);
        });   
        this.response['status'] = 1;
        this.response['body'] = 'Flows and operations created/updated successfully. Don\'t forget to add collections to the triggers';
        return this.response;     
    },
    create: async function(type, json){
        const request_url = `${this.request_url_base}/${type}`
        return fetch(request_url, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.access_token}`
            },
            method: 'post',
            body: typeof json === 'string' ? json : JSON.stringify(json)
        })
         .then( (res)=>{
            if (!res.ok) {
                console.log('create res not ok');
            }
            return res.json();
         })
         .then((data)=>{
            console.log(data);
            return data['data'];    
         })
         .catch((err)=>{
            alert(err);
         });
    },
    update: async function(type, id, json){
        const request_url = `${this.request_url_base}/${type}/${id}`
        return fetch(request_url, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.access_token}`
            },
            method: 'PATCH',
            body: typeof json === 'string' ? json : JSON.stringify(json)
        })
         .then( (res)=>{
            if (!res.ok) {
                console.log('update res not ok');
            }
            return res.json();
         })
         .then((data)=>{
            return data['data'];    
         })
         .catch((err)=>{
            alert(err);
         });
    }
}
export default flowMaintainer;