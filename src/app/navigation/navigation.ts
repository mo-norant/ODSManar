export const navigation = [

    {
        'id': 'dashboard',
        'title': 'Dashboard',
        'type': 'item',
        'url': 'catharina/'


    },
    {
        'id': 'applications',
        'title': 'Oogstkaart',
        'type': 'group',
        'children': [
            {


                'id': 'artikelen',
                'title': 'Mijn artikelen',
                'type': 'item',
                'url': 'catharina/oostkaart'
            },
            {
                'id': 'nieuwartikel',
                'title': 'Nieuw artikel toevoegen',
                'type': 'item',
                'url': 'catharina/newproduct'
            },






        ]
    }
];
