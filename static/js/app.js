// Fetch the JSON data and console log it

function init() {
    d3.json('./data/samples.json').then((data) => {
     console.log(data);
      
          
})};


    ////////////////////DROPDOWN\\\\\\\\\\\\\\\\\\\\
    
    var selector = d3.select("#selDataset");
    
    d3.json('./data/samples.json').then((data) => {    
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
          selector
            .append('option')
            .text(sample)
            .property('value', sample);
        });

       
     function buildPlots(sampleNames) {
      d3.json("samples.json").then((data) => {
          var info = data.samples;
      var ids = info.otu_ids;
      var labels = info.otu_labels;
      var values = info.sample_values;
    

  
    
    ////////////////////BAR PLOT\\\\\\\\\\\\\\\\\\\\
      
      var values = data.sort((a, b) => b.values - a.values);

      values = values.slice(0, 10);


      
      var Trace1 = 
        {
          x: values,
          y: ids,
          text: labels,          
          type: 'bar',
          orientation: 'h'
        };

      var slicedData = [Trace1];

      var layout = 
      {
        title: "Belly Button Biodiversity",
      };
      
      Plotly.newPlot('bar', slicedData, layout);      


  //     ////////////////////BUBBLE CHART\\\\\\\\\\\\\\\\\\\\

     
      var Trace2 = 
        {
          x: ids,
          y: values,
          text: labels,          
          mode: "markers",
          marker: {
          size: values,
          color: ids 
          }
        };

      var slicedData2 = [Trace2];  

      var layout = 
      {
        title: "Belly Button Biodiversity",
      };
      
      Plotly.newPlot('bubble', slicedData2, layout);


  //     ////////////////////DEMOGRAPHICS\\\\\\\\\\\\\\\\\\\\

      var id = data.metadata["id"];
      var ethnicity = data.metadata["ethnicity"];
      var gender = data.metadata["gender"];
      var age = data.metadata["age"];
      var location = data.metadata["location"];
      var bbtype = data.metadata["bbtype"];
      var wfreq = data.metadata["wfreq"];
      buildTable(id, ethnicity, gender, age, location, bbtype, wfreq);
  
  function buildTable(id, ethnicity, gender, age, location, bbtype, wfreq) {
    var table = d3.select("#sample-metadata");
    table.append("tbody");  
    var tbody = table.select("tbody");
    tbody.append("tr").text("ID: " + id);
    tbody.append("tr").text("Ethnicity: " + ethnicity);
    tbody.append("tr").text("Gender: " + gender);
    tbody.append("tr").text("Age: " + age);
    tbody.append("tr").text("Location: " + location);
    tbody.append("tr").text("BBType: " + bbtype);
    tbody.append("tr").text("WFreq: " + wfreq);
  }
})
}
var firstSample = sampleNames[0];
buildCharts(firstSample);
buildMetadata(firstSample);

});

function optionChanged(newSample) {
buildCharts(newSample);
buildMetadata(newSample);    
}

init();    

