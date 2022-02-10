$(function () {
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
      "<tr id=" + id + ">" +
        "<td class='id' >" + id + "</td>" +
        "<td class='name'> <input type='text' value="+ name +" readonly> </td>" +
        "<td class='gender' ><input type='text' value="+ radioValue +" readonly></td>" +
        "<td class='age' ><input type='number' value="+ age +" readonly></td>" +
        "<td class='city'>"+
        "<select disabled>"+
        "<option value='Lahore'>Lahore</option>"+
        "<option value='Karachi'>Karachi</option>"+
        "<option value='Islamabad' >Islamabad</option>"+
        "</select>"+
        "</td>" +
        "<td>" +
        "<button class='btn btn-warning float right'  onclick= onEdit(" + id + ") >" +
        " Edit " +
        "</button>" +
        "<button class='btn btn-info float right' onclick= onSave(" + id + ") >" +
        " Save " +
        "</button>" +
        "<button class='btn btn-danger float right' onclick= onDelete(event) >" + 
        " Remove " +
        "</button>" +
        "</td>" +
        "</tr>"
    );
    id++;
    $("#form").hide();
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
  
    if (checkVal(Id)) {
      var colName = id.children(".name").children("input").prop("readonly", true);
      var colGender = id
        .children(".gender")
        .children("input")
        .prop("readonly", true);
      var colAge = id.children(".age").children("input").prop("readonly", true);
      var colCity = id.children(".city").children("select").prop("disabled", true);
    }
  }
  
  function checkVal(id) {
    var ID = $("#" + id);
    var colName = ID.children(".name").children("input").prop("value");
    var colGender = ID.children(".gender").children("input").prop("value");
    var colAge = ID.children(".age").children("input").prop("value");
  //var colCity = ID.children(".city").children("select, option").prop("selected, value");
  
  
    var a,
      b,
      c= false;
  
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
      if (colGender == 'female' || colGender == 'male' || colGender == 'other') {
          ID.children(".gender").children("input").removeClass("error");
          c = true;
        } else {
          ID.children(".gender").children("input").addClass("error");
        }
    }
  
  //   //city
  //   {
  //     if (colCity == 'Karachi' || colCity == 'Lahore' || colCity == 'Islamabad') {
  //         ID.children(".city").children("input").removeClass("error");
  //         d = true;
  //       } else {
  //         ID.children(".city").children("input").addClass("error");
  //       }
  //   }
  
    
  
    if (a == true && b == true && c == true) {
      console.log("success");
      return true;
    } 
    else {
      console.log("fail");
      return false;
    }
  
  }
  
  function View() {
    $("#form").show();
  }
  
  function Reset() {
    $("#name, #age, #city-names, #gen, #id").removeClass("error");
    $("#id").val("");
    $("#name").val("");
    $("input[name=gender]").prop("checked", false);
    $("#age").val("");
    $("#city-names").val("");
  }