export const navigation = [

    {
        'id': 'dashboard',
        'title': 'Dashboard',
        'type': 'item',
        'url': 'dashboard/'


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
                'url': 'dashboard/oostkaart'
            },
            {
                'id': 'nieuwartikel',
                'title': 'Nieuw artikel toevoegen',
                'type': 'item',
                'url': 'dashboard/newproduct'
            },






        ]
    }
];


export const adminnavigation = [

    {
        'id': 'dashboard',
        'title': 'Dashboard',
        'type': 'item',
        'url': 'dashboard/'
    },
    {
        'id': 'applications',
        'title': 'Gebruikersmanager',
        'type': 'group',
        'children': [
            {
                'id': 'artikelen',
                'title': 'Alle gebruikers',
                'type': 'item',
                'url': 'dashboard/usermanager'
            }
        ]
    }
];

