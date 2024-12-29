const flows = [
    {
        'flow': 'revalidate pages',
        'operations': [
            'is production',
            'call nextjs'
        ]
    },
    {
        'flow': 'slugify name',
        'operations': [
            'check slug',
            'name not null',
            'slugify',
            'update'
        ]
    }
]

export default flows;