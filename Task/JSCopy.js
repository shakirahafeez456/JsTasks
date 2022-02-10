$(function () {
    //$("#list").on("click",".btn-warning",onEdit);
    $("#form").on("click", "#submit", Submit);
    $("#addNew").click(addnew);
    $("#reset").click(Reset);
  });
  var id = 2;
  
  function addnew() {
    var name = $("#name").val();
    var radioValue = $("input[name='gender']:checked").val();
    var age = $("#age").val();
    var city = $("#city-names").val();
  
    if (!name || !age || !city || !radioValue) {
      $("#name, #age, #city-names, #gen, #id ").addClass("error");
      return;
    }
    Reset();
  
    $("#list").append(
      "<tr id=" +
        id +
        ">" +
        "<td class='id' >" +
        id +
        "</td>" +
        "<td class='name'>" +
        name +
        "</td>" +
        "<td class='gender' >" +
        radioValue +
        "</td>" +
        "<td class='age' >" +
        age +
        "</td>" +
        "<td class='city' >" +
        city +
        "</td>" +
        "<td>" +
        "<button class='btn btn-warning float right'  onclick= onEdit(" +
        id +
        ") >" +
        " Edit " +
        "</button>" +
        "<button class='btn btn-danger float right' onclick= onDelete(event) >" +
        " Remove " +
        "</button>" +
        "</td>" +
        "</tr>"
    );
    id++;
  }
  
  function onDelete(e) {
    var tag = e.target;
    console.log(e);
    var ptag = tag.parentNode;
    var pptag = ptag.parentNode;
    pptag.parentNode.removeChild(pptag);
  }
  
  function onEdit(iD) {
    var id = $("#" + iD);
    var colId = id.children(".id").html();
    var colName = id.children(".name").html();
    var colGender = id.children(".gender").html();
    var colAge = id.children(".age").html();
    var colCity = id.children(".city").html();
  
    $("#id").val(colId);
    $("input:text").val(colName);
    $("input[name=gender][value=" + colGender + "]").prop("checked", true);
    $("#age").val(colAge);
    $("#city-names").val(colCity);
  
    $("#show").show();
    //$("#city-names"[value = "+ col4 +"]).toggle($("#city-names").val() === $(col4).val());
  }
  function Submit() {
    var formid = $("#id").val();
    var formName = $("input:text").val();
    var formGender = $("input[name='gender']:checked").val();
    var formAge = $("#age").val();
    var formCity = $("#city-names").val();
  
    var Recid = $("#" + formid);
    Recid.children(".name").html(formName);
    Recid.children(".gender").html(formGender);
    Recid.children(".age").html(formAge);
    Recid.children(".city").html(formCity);
  
    Reset();
  }
  
  function Reset() {
    $("#name, #age, #city-names, #gen, #id").removeClass("error");
    $("#id").val("");
    $("#name").val("");
    $("input[name=gender]").prop("checked", false);
    $("#age").val("");
    $("#city-names").val("");
  }
  