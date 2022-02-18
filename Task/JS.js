// $(window).on("resize", function () {
//   var win = $(this);
//   if (win.width() < 600) {
//     $(".btn-warning").addClass("glyphicon glyphicon-edit");
//     $(".btn-warning").html("");
//     $(".btn-danger").addClass("glyphicon glyphicon-remove");
//     $(".btn-danger").html("");
//     $(".btn-info").addClass("glyphicon glyphicon-ok");
//     $(".btn-info").html("");
//   } else {
//     $(".btn-warning").removeClass("glyphicon glyphicon-edit");
//     $(".btn-warning").html("Edit");
//     $(".btn-danger").removeClass("glyphicon glyphicon-remove");
//     $(".btn-danger").html("Remove");
//     $(".btn-info").removeClass("glyphicon glyphicon-ok");
//     $(".btn-info").html("Save");
//   }
// });

$(function () {
  $("#addNew").click(addnew);
  $("#reset").click(Reset);
  $("#myModal").on("shown.bs.modal", function () {
    $("#myInput").trigger("focus");
  });
});
var id = 2;

function addnew() {
  var name = $("#name").val();
  var radioValue = $("input[name='gender']:checked").val();
  var age = $("#age").val();
  var city = $("#city-names").val();

  if (!check(id, name, radioValue, age)) {
    $("#addNew").removeAttr("data-dismiss", "modal");
    return;
  } else {
    $("#addNew").attr("data-dismiss", "modal");
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
      "<td class='age' >" +
      age +
      "</td>" +
      "<td class='city'>" +
      city +
      "</td>" +
      "<td>" +
      "<button class='btn btn-warning float right'  onclick= onEdit(" +
      id +
      ") >" +
      " Edit " +
      "</button>" +
      "<button class= 'btn btn-info float-right' onclick= onSave(" +
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
  $(".alert-info").show();
  $(".alert-info").delay(1500).fadeOut();

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
  } else if (city == "Islamabad") {
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
  $(".btn-warning").prop("disabled", true);
  var id = $("#" + iD);

  var colName = id.children(".name").html();
  id.children(".name").html("");
  id.children(".name").append("<input type='text'  style='white-space: pre'>");
  id.children(".name").children("input").prop("value", colName);

  var colGender = id.children(".gender").html();
  id.children(".gender").html("");
  id.children(".gender").append(
    "<input type='radio' name='gender' value='male' class='gender mx-1' >" +
      "male" +
      "<input type='radio' name='gender' value='female' class='gender mx-1' >" +
      "female" +
      "<input type='radio' name='gender' value='other' class='gender mx-1' >" +
      "other"
  );
  id.children(".gender")
    .children("input[name=gender][value=" + colGender + "]")
    .prop("checked", true);

  var colAge = id.children(".age").html();
  id.children(".age").html("");
  id.children(".age").append("<input type='number' value='21'>");

  var colCity = id.children(".city").html();
  id.children(".city").html("");
  id.children(".city").append(
    "<select name='citynames' class='cityNames'>" +
      "<option value='Karachi'>Karachi</option>" +
      "<option value='Lahore'>Lahore</option>" +
      "<option value='Islamabad'>Islamabad</option></select>"
  );
}

function onSave(Id) {
  var id = $("#" + Id); //whole tr object
  var name = id.children(".name").children("input").val();
  var gender = $("input[name='gender']:checked").val();
  var age = id.children(".age").children("input").val();
  var city = id.children(".city").children("select, option, .selected").val();

  if (checkVal(Id)) {
    id.children(".name").html("");
    var colName = id.children(".name").append(name);

    id.children(".gender").html("");
    var colGender = id.children(".gender").append(gender);

    id.children(".age").html("");
    var colAge = id.children(".age").append(age);

    id.children(".city").html("");
    id.children(".city").append(city);

    $(".alert-primary").show();
    $(".alert-primary").delay(1500).fadeOut();
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
    var yz = "/^[a-zA-Z]$/";

    if (
      colName.match("^[a-zA-Z'-pL]+(?:(?! {2})[a-zA-Z'-pL ])*[a-zA-Z'-pL]+$")
    ) {
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
    $(".btn-warning").prop("disabled", false);
    return true;
  } else {
    console.log("fail");
    return false;
  }
}

function check(id, name, gender, age) {
  var ID = $("#" + id);
  var a,
    b,
    c = false;
  //name
  {
    if (name.match("^[a-zA-Z'-pL]+(?:(?! {2})[a-zA-Z'-pL ])*[a-zA-Z'-pL]+$")) {
      $("#name").removeClass("error");
      a = true;
    } else {
      $("#name").addClass("error");
    }
  }

  //age
  {
    if (age > 0 && age < 100) {
      $("#age").removeClass("error");
      b = true;
    } else {
      $("#age").addClass("error");
    }
  }

  //gender
  {
    if (gender == "female" || gender == "male" || gender == "other") {
      $("#gen").children("#radio").removeClass("error");
      c = true;
    } else {
      $("#gen").children("#radio").addClass("error");
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
