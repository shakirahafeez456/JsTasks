$(function () {
  $("#addNew").click(addnew);
  $("#reset").click(Reset);
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
});
var id = 2;

function addnew() {
  var name = $("#name").val();
  var radioValue = $("input[name='gender']:checked").val();
  var age = $("#age").val();
  var city = $("#city-names").val();

  if (!name || !age || !city || !radioValue) {
    $("#name, #age, #city-names, #gen, #id ").addClass("error");
    $("#addNew").removeAttr("data-dismiss","modal");
    return;
  }else if(!name.match("^[a-zA-Z]{2,16}$")){
    $("#name").addClass("error");
    $("#addNew").removeAttr("data-dismiss","modal");
    return;
  }else{
    $("#addNew").attr("data-dismiss","modal");
  }

  Reset();

  $("#list").append(
    "<tr id=" +
      id +
      ">" +
      "<td class='id' >" +
      id +
      "</td>" +
      "<td class='name'> <input type='text' value=" +
      name +
      " readonly> </td>" +
      "<td class='gender' ><input type='text' value=" +
      radioValue +
      " readonly></td>" +
      "<td class='age' ><input type='number' value=" +
      age +
      " readonly></td>" +
      "<td class='city'>" +
      "<select name='citynames' class='cityNames' disabled>" +
      "<option class='selected' value=" +
      city +
      ">" +
      city +
      "</option>" +
      "</select>" +
      "</td>" +
      "<td>" +
      "<button class='btn btn-warning float right'  onclick= onEdit(" +
      id +
      ") >" +
      " Edit " +
      "</button>" +
      "<button class='btn btn-info float right' onclick= onSave(" +
      id +
      ") >" +
      " Save " +
      "</button>" +
      "<button class='btn btn-danger float right' onclick= onDelete(event) >" +
      " Remove " +
      "</button>" +
      "</td>" +
      "</tr>"
  );

  if (city == "Karachi") {
    $("#" + id)
      .children(".city")
      .children("select, option")
      .append(
        "<option value='Lahore'>Lahore</option>" +
          "<option value='Islamabad'>Islamabad</option>"
      );
  } else if (city == "Lahore") {
    $("#" + id)
      .children(".city")
      .children("select, option")
      .append(
        "<option value='Karachi'>Karachi</option>" +
          "<option value='Islamabad'>Islamabad</option>"
      );
  } else if(city == "Islamabad"){
    $("#" + id)
    .children(".city")
    .children("select, option")
    .append(
      "<option value='Karachi'>Karachi</option>" +
        "<option value='Lahore'>Lahore</option>"
    );
  }

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

  var colName = id.children(".name").children("input").prop("readonly", false);
  var colGender = id
    .children(".gender")
    .children("input")
    .prop("readonly", false);
  var colAge = id.children(".age").children("input").prop("readonly", false);
  var colCity = id.children(".city").children("select").prop("disabled", false);

}

function onSave(Id) {
  var id = $("#" + Id); //whole tr object
  var name = id.children(".name").children("input").val();
  var gender = id.children(".gender").children("input").val();
  var age = id.children(".age").children("input").val();
  var city = id.children(".city").children("select, option, .selected").val();

  if (checkVal(Id)) {
    var colName = id
      .children(".name")
      .children("input")
      .prop("readonly", true)
      .attr("value", name);
    var colGender = id
      .children(".gender")
      .children("input")
      .prop("readonly", true)
      .attr("value", gender);
    var colAge = id
      .children(".age")
      .children("input")
      .prop("readonly", true)
      .attr("value", age);
    var colCity = id
      .children(".city")
      .children("select")
      .prop("disabled", true);
    let a = id
      .children(".city")
      .children("select, option, .selected")
      .val(city);
  }
}

function checkVal(id) {
  var ID = $("#" + id);
  var colName = ID.children(".name").children("input").prop("value");
  var colGender = ID.children(".gender").children("input").prop("value");
  var colAge = ID.children(".age").children("input").prop("value");
  var a,
    b,
    c = false;

  //name
  {
    if (colName.match("^[a-zA-Z]{2,16}$")) {
      ID.children(".name").children("input").removeClass("error");
      a = true;
    } else {
      ID.children(".name").children("input").addClass("error");
    }
  }

  //age
  {
    if (colAge > 0 && colAge < 100) {
      ID.children(".age").children("input").removeClass("error");
      b = true;
    } else {
      ID.children(".age").children("input").addClass("error");
    }
  }

  //gender
  {
    if (colGender == "female" || colGender == "male" || colGender == "other") {
      ID.children(".gender").children("input").removeClass("error");
      c = true;
    } else {
      ID.children(".gender").children("input").addClass("error");
    }
  }

  if (a == true && b == true && c == true) {
    console.log("success");
    return true;
  } else {
    console.log("fail");
    return false;
  }
}

function Reset() {
  $("#name, #age, #city-names, #gen, #id").removeClass("error");
  $("#id").val("");
  $("#name").val("");
  $("input[name=gender]").prop("checked", false);
  $("#age").val("");
  $("#city-names").val("");
}