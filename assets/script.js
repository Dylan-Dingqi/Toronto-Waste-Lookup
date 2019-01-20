

var data;

loadJSON(function(response) {
      data = JSON.parse(response);
});

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        search();
    }
});
$("button.btn").click(search);

function search(){
    $(".node:not(.green-star)").remove();

    
    var old_element = document.querySelector(".list-group.search");
    if (old_element != null){
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element,old_element);
    }


    //grabbing new todo text from input
    var keyword = $("input[type='text']").val().toLowerCase();
    //create a new li and add to ul
    var count = 0;

    if (keyword !== ""){
        data.forEach(element => {
            //if (element.keywords.includes(keyword)){
            if (found(element.keywords, keyword)){
                var result = '<li class="list-group-item node d-block d-md-flex " '+ '">';
                result += "<h6 class='mr-3 star'>★</h4>";
                result += "<h5>" + element.title + "</h5>"; //title
                result += '<div class="list-body">';
                result += $("<p/>").html(element.body).text();          //description
                result += '</div>';
                result += '</li>';
                $("ul.search").append(result);
                count++;
            }
        });
    }

    var list = document.querySelectorAll(".node");

    $(".node").click(function(event){
        this.classList.toggle("green-star");
        console.log(count);
    });
}

function found(keywords,search){
    var words = search.split(" ");
    for (var x = 0; x < words.length; x++){
        if (!keywords.includes(words[x])){
            return false;
        }
    }
    return true;
}

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000", true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

