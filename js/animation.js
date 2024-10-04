

/* Used AI to animate the spins using the addEventListener */
document.addEventListener('DOMContentLoaded', () => {
    const triangles = document.querySelectorAll('.triangle');
    triangles.forEach(triangle => { 
        triangle.addEventListener('loopingTriangle', () => {
            triangle.classList.toggle('spinning'); 
        });
    });
    

    triangles.forEach(triangle => {
        setInterval(() => {
            triangle.dispatchEvent(new Event('loopingTriangle'));
        }, 1000); 
    });
});



async function render() {

    // loading the data data
    const data = await d3.csv("dataset/videogames_wide.csv");

    // visualization 1a: global sales by genre
    const vlSpec1 = vl
        .markBar({ color: 'pink' })
        .data(data)
        .encode(
            vl.x().fieldN("Genre"),
            vl.y().fieldQ("Global_Sales").aggregate("sum"),
        )
        .width(360)
        .height(400)
        .toSpec();
    vegaEmbed("#barchart1", vlSpec1).then((result) => {
        const view = result.view;
        view.run();
    });  

    // visualization 1b: global sales by platform
    const vlSpec2 = vl
        .markBar({ color: 'hotpink' })
        .data(data)
        .encode(
        vl.x().fieldN("Platform").sort('-x'),
        vl.y().fieldQ("Global_Sales").aggregate('sum'),
        )
        .width(500)
        .height(400)
        .toSpec();

        vegaEmbed("#barchart2", vlSpec2).then((result) => {
            const view = result.view;
            view.run();
        });

    // end of visual 1

    // visualization 2a: sales over time by platform 
    const vlSpec3 = vl
        .markBar() 
        .data(data)
        .transform(
            vl.filter("datum.Year != 'N/A'"),
            vl.filter("datum.Year != 'Misc'")
    )
    .encode(
        vl.x().fieldN('Year'),
        vl.y().fieldQ('Global_Sales').aggregate('sum'),
        vl.color().fieldN('Genre').scale({scheme: 'tableau10'}),
        vl.tooltip().fieldN('Genre')
        )
        .width(450)
        .height(550)
        .toSpec();

        vegaEmbed("#barchart3", vlSpec3).then((result) => {
            const view = result.view;
            view.run();
        });

    // visualization 2b: sales over time by genre 
    const vlSpec4 = vl
        .markBar()  
        .data(data)
        .transform(
        vl.filter("datum.Year != 'N/A'"),
        vl.filter("datum.Year != 'Misc'")
        )
        .encode(
            vl.x().fieldN('Year'),
            vl.y().fieldQ('Global_Sales').aggregate('sum'),
            vl.color().fieldN('Platform').scale({scheme: 'spectral'}),
            vl.tooltip().fieldN('Platform')
        )
        .width(450)
        .height(550)
        .toSpec();

        vegaEmbed("#barchart4", vlSpec4).then((result) => {
            const view = result.view;
            view.run();
        });
         // end of visual 2


        // visuals for section 3
        // visualization 3a: regional sales vs. platform (north america sales by platform)
        const vlSpec5 = vl
            .markBar({ color: 'hotpink' })
            .data(data)
            .encode(
            vl.x().fieldN('Platform').sort('-y'),
            vl.y().fieldQ('NA_Sales').aggregate('sum'),
            )
            .width(500)
            .height(250)
            .toSpec();
        
            vegaEmbed("#barchart5", vlSpec5).then((result) => {
                const view = result.view;
                view.run();
            });

        // visualization 3b: regional sales vs. platform (europe sales by platform)
        const vlSpec6 = vl
            .markBar({ color: 'orange' })
            .data(data)
            .encode(
            vl.x().fieldN('Platform').sort('-y'),
            vl.y().fieldQ('EU_Sales').aggregate('sum'),
            )
            .width(500)
            .height(250)
            .toSpec();
        
        vegaEmbed("#barchart6", vlSpec6).then((result) => {
            const view = result.view;
            view.run();
        });

         // visualization 3c: regional sales vs. platform (japan sales by platform)
         const vlSpec7 = vl
            .markBar({ color: 'pink' })
            .data(data)
            .encode(
            vl.x().fieldN('Platform').sort('-y'),
            vl.y().fieldQ('JP_Sales').aggregate('sum'),
            )
            .width(500)
            .height(250)
            .toSpec();
        
        vegaEmbed("#barchart7", vlSpec7).then((result) => {
            const view = result.view;
            view.run();
        });
       

        // visualization 3d: regional sales vs. platform (other regions sales by platform)
        const vlSpec8 = vl
            .markBar({ color: 'purple' })
            .data(data)
            .encode(
            vl.x().fieldN('Platform').sort('-y'),
            vl.y().fieldQ('Other_Sales').aggregate('sum'),
            )
            .width(500)
            .height(250)
            .toSpec();
        
        vegaEmbed("#barchart8", vlSpec8).then((result) => {
            const view = result.view;
            view.run();
        });
      


        // end of visual 3

        // start of visual 4: telling a story
        // visual 4a peak sales in japan by year
        const vlSpecJapan = vl
            .markLine({ color: 'purple' }) 
            .data(data) 
            .encode(
                vl.x().fieldN('Year'),
                vl.y().fieldQ('JP_Sales').aggregate('sum'),
            )
            .width(550) 
            .height(300) 
            .toSpec(); 

        vegaEmbed("#barchartJapan", vlSpecJapan).then((result) => {
            const view = result.view; 
            view.run(); 

});


        // visual 4b peak sales in europe by year
        const vlSpecEuro = vl
        .markLine({ color: 'orange' }) 
        .data(data) 
        .encode(
            vl.x().fieldN('Year'),
            vl.y().fieldQ('EU_Sales').aggregate('sum'),
        )
        .width(550) 
        .height(300) 
        .toSpec(); 

    vegaEmbed("#barchartEuro", vlSpecEuro).then((result) => {
        const view = result.view; 
        view.run(); 

});





}

// render all the visuals
render();
