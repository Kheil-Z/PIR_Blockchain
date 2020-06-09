var config = {
    content: [{
        type: 'row',
        content: [
            {
                type: 'component',
                componentName: 'Home',
                componentState: {text: 'Component 3'}
            },
            {
                type: 'column',
                content: [{
                    type: 'component',
                    componentName: 'Blocks',
                    componentState: {text: 'Nombre de blocks', nombre: '36'}
                }, {
                    type: 'component',
                    componentName: 'Noeuds',
                    componentState: {text: 'Nombre de noeuds', nombre: '24'}
                }]


            },

        ]
    }]
};

var myLayout = new GoldenLayout(config);

myLayout.registerComponent('Noeuds', function (container, state) {
    container.getElement().html('<h2>' + state.text + '</h2>' + '<h1>' + state.nombre + '</h1>');
});
myLayout.registerComponent('Blocks', function (container, state) {
    container.getElement().html('<h2>' + state.text + '</h2>' + '<h1>' + state.nombre + '</h1>');
});
myLayout.registerComponent('Home', function (container, state) {
    container.getElement().html('<h2>' + state.text + '</h2>');
});
myLayout.init();