type = ['','info','success','warning','danger'];


demo = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },

    initChartist: function(){
		var dataSales = {
          labels: [],
          series: [[]]
        };
		var lis = document.getElementById("kn-net").getElementsByTagName("li");
		for (i = 0; i < lis.length; i++) { 
		   text = lis[i].innerHTML;
           dataSales["labels"][i] = text.substring((text.indexOf("Date:") + 5), (text.indexOf("Message:") - 8)); 
           dataSales["series"][0][i] = parseInt(text.substring((text.indexOf("Message:") + 8), (text.indexOf("known nodes")))); 
        }
        

        var optionsSales = {
          lineSmooth: false,
          low: 0,
          high: 8,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
        };

        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

    }
}
