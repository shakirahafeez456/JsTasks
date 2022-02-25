{
    //responsiveness on buttons, changes to icons
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
  }
  
  $(function () {
    $("#addNew").click(addnew);
    $("#reset").click(Reset);
    $(".btn-secondary").click(Reset);
    locStorage();
    console.log(localStorage.length);
  });
  let index = localStorage.length;
  var id = index;
  
  function addnew() {
    var name = $("#name").val();
    var radioValue = $("input[name='gender']:checked").val();
    var age = $("#age").val();
    var city = $("#city-names").val();
    var num = $("#num").val();
    var address = $("#address").val();
    var email = $("#email").val();
    var cnic = $("#cnic").val();
  
    if (!check()) {
      $("#addNew").removeAttr("data-dismiss", "modal");
      return;
    } else {
      $("#addNew").attr("data-dismiss", "modal");
    }
  
    Reset();
  
    //locStorage
    {
      let arr = [];
      arr[index] = {
        id: index,
        name: name,
        radioValue: radioValue,
        age: age,
        city: city,
        num: num,
        address: address,
        email: email,
        cnic: cnic,
      };
  
      localStorage.setItem("arr" + [index] + "", JSON.stringify(arr[index]));
    }
  
    {
      appenD(id, name, radioValue, age, city, num, address, email, cnic);
      $(".alert-info").show();
      $(".alert-info").delay(1500).fadeOut();
      {
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
      }
    }
  
    id++;
    index++;
  }
  
  function locStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      let retrievedObject = [];
      retrievedObject[i] = JSON.parse(localStorage.getItem("arr" + [i] + ""));
  
      if (!retrievedObject[i]) {
        console.log("not found" + retrievedObject[i]);
        i++;
        return;
      }
      else {
        retrievedObject.forEach(function (key) {
          var id = key.id;
          var name = key.name;
          var radioValue = key.radioValue;
          var age = key.age;
          var city = key.city;
          var num = key.num;
          var address = key.address;
          var email = key.email;
          var cnic = key.cnic;
          appenD(id, name, radioValue, age, city, num, address, email, cnic);
        });
      }
    }
  }
  
  function appenD(id, name, radioValue, age, city, num, address, email, cnic) {
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
        "<td class='num'>" +
        num +
        "</td>" +
        "<td class='address'>" +
        address +
        "</td>" +
        "<td class='email'>" +
        email +
        "</td>" +
        "<td class='cnic'>" +
        cnic +
        "</td>" +
        // buttons
        "<td>" +
        "<button class='btn btn-warning float right glyphicon glyphicon-edit'  onclick= onEdit(" +
        id +
        ") >" +
        // " Edit " +
        "</button>" +
        "<button class= 'btn btn-info float-right glyphicon glyphicon-ok' onclick= onSave(" +
        id +
        ") >" +
        // " Save " +
        "</button>" +
        "<button class='btn btn-danger float right glyphicon glyphicon-remove' onclick= onDelete(" +
        id +
        ",event) >" +
        // " Remove " +
        "</button>" +
        "</td>" +
        "</tr>"
    );
  }
  
  function onEdit(iD) {
    $(".btn-warning").prop("disabled", true);
    var id = $("#" + iD);
  
    //
    var colName = id.children(".name").html();
    id.children(".name").html("");
    id.children(".name").append("<input type='text'  style='white-space: pre'>");
    id.children(".name").children("input").prop("value", colName);
  
    //
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
  
    //
    var colAge = id.children(".age").html();
    id.children(".age").html("");
    id.children(".age").append("<input type='number' value=" + colAge + ">");
  
    //
    var colCity = id.children(".city").html();
    id.children(".city").html("");
    id.children(".city").append(
      "<select name='cityNames' class='cityNames'>" +
        "<option value='Lahore'>   Lahore</option>" +
        "<option value='Karachi'>  Karachi</option>" +
        "<option value='Islamabad'>Islamabad</option></select>"
    );
    id.children(".city").children("select").val(colCity);
  
    //
    var colNum = id.children(".num").html();
    id.children(".num").html("");
    id.children(".num").append("<input >");
    id.children(".num").children("input").prop("value", colNum);
  
    //
    var colAddress = id.children(".address").html();
    id.children(".address").html("");
    id.children(".address").append(
      "<input type='text'  style='white-space: pre'>"
    );
    id.children(".address").children("input").prop("value", colAddress);
  
    //
    var colEmail = id.children(".email").html();
    id.children(".email").html("");
    id.children(".email").append("<input type='text'>");
    id.children(".email").children("input").prop("value", colEmail);
  
    //
    var colCnic = id.children(".cnic").html();
    id.children(".cnic").html("");
    id.children(".cnic").append("<input >");
    id.children(".cnic").children("input").prop("value", colCnic);
  }
  
  function onSave(Id) {
    var id = $("#" + Id); //whole tr object
    var name = id.children(".name").children("input").val();
    var gender = $("input[name='gender']:checked").val();
    var age = id.children(".age").children("input").val();
    var city = id.children(".city").children("select, option, .selected").val();
    var num = id.children(".num").children("input").val();
    var address = id.children(".address").children("input").val();
    var email = id.children(".email").children("input").val();
    var cnic = id.children(".cnic").children("input").val();
  
    if (checkVal(Id)) {
      id.children(".name").html("");
      id.children(".name").append(name);
  
      id.children(".gender").html("");
      id.children(".gender").append(gender);
  
      id.children(".age").html("");
      id.children(".age").append(age);
  
      id.children(".city").html("");
      id.children(".city").append(city);
  
      id.children(".num").html("");
      id.children(".num").append(num);
  
      id.children(".address").html("");
      id.children(".address").append(address);
  
      id.children(".email").html("");
      id.children(".email").append(email);
  
      id.children(".cnic").html("");
      id.children(".cnic").append(cnic);
  
      $(".alert-primary").show();
      $(".alert-primary").delay(1500).fadeOut();
    }
  }
  
  function checkVal(id) {
    var ID = $("#" + id);
    var colName = ID.children(".name").children("input").prop("value");
    var colGender = ID.children(".gender").children("input").prop("value");
    var colAge = ID.children(".age").children("input").prop("value");
    var colNum = ID.children(".num").children("input").prop("value");
    var colCnic = ID.children(".cnic").children("input").prop("value");
    var colAddress = ID.children(".address").children("input").prop("value");
    var colEmail = ID.children(".email").children("input").prop("value");
  
    var a,
      b,
      c,
      d,
      e,
      f,
      g = false;
  
    //name
    {
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
  
    //92xxxxxxxxxx
    {
      var phoneno = /^\d{12}$/;
      var first_three = colNum.slice(0, 2);
  
      if (first_three == 92 && colNum.match(phoneno)) {
        ID.children(".num").children("input").removeClass("error");
        d = true;
      } else ID.children(".num").children("input").addClass("error");
    }
  
    //CNIC
    {
      //xxxxx - xxxxxxx - x;
      var cnic = /^\(?([0-9]{5})\)?[-. ]?([0-9]{7})[-. ]?([0-9]{1})$/;
      if (colCnic.match(cnic)) {
        ID.children(".cnic").children("input").removeClass("error");
        e = true;
      } else ID.children(".cnic").children("input").addClass("error");
    }
  
    //address
    {
      if (
        colAddress.match("^[a-zA-Z'-pL]+(?:(?! {2})[a-zA-Z'-pL ])*[a-zA-Z'-pL]+$")
      ) {
        ID.children(".address").children("input").removeClass("error");
        f = true;
      } else {
        ID.children(".address").children("input").addClass("error");
      }
    }
  
    //email
    {
      if (colEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        ID.children(".email").children("input").removeClass("error");
        g = true;
      } else {
        ID.children(".email").children("input").addClass("error");
      }
    }
  
    if (
      a == true &&
      b == true &&
      c == true &&
      d == true &&
      e == true &&
      f == true &&
      g == true
    ) {
      console.log("success");
      $(".btn-warning").prop("disabled", false);
      return true;
    } else {
      console.log("fail");
      return false;
    }
  }
  
  function check() {
    var ID = $("#" + id);
    var a,
      b,
      c,
      f,
      d,
      e,
      g,
      h = false;
  
    //name
    {
      var name = $("#name").val();
      if (name.match("^[a-zA-Z'-pL]+(?:(?! {2})[a-zA-Z'-pL ])*[a-zA-Z'-pL]+$")) {
        $("#name").removeClass("error");
        a = true;
      } else {
        $("#name").addClass("error");
      }
    }
  
    //age
    {
      var age = $("#age").val();
      if (age > 0 && age < 100) {
        $("#age").removeClass("error");
        b = true;
      } else {
        $("#age").addClass("error");
      }
    }
  
    //gender
    {
      var gender = $("input[name='gender']:checked").val();
      if (gender) {
        $("#radio").removeClass("error");
        c = true;
      } else {
        $("#radio").addClass("error");
      }
    }
  
    //city
    {
      var city = $("#city-names").val();
      if (city) {
        $("#city-names").removeClass("error");
        h = true;
      } else {
        $("#city-names").addClass("error");
      }
    }
  
    //92xxxxxxxxxx
    {
      var num = $("#num").val();
      var phoneno = /^\d{2}$/;
      var first_three = num.slice(0, 2);
  
      if (first_three == 92 && num.match(phoneno)) {
        $("#num").removeClass("error");
        f = true;
      } else $("#num").addClass("error");
    }
  
    //email
    {
      var email = $("#email").val();
      var x = email.length;
      var y = x - 10;
      var z = email.slice(y, y + 11);
  
      if (y > 0 && x > 10 && z == "@gmail.com") {
        $("#email").removeClass("error");
        d = true;
      } else $("#email").addClass("error");
    }
  
    //CNIC
    {
      var cnicc = /^\(?([0-9]{5})\)?[-. ]?([0-9]{7})[-. ]?([0-9]{1})$/;
      var cnic = $("#cnic").val();
      if (cnic.match(cnicc)) {
        $("#cnic").removeClass("error");
        e = true;
      } else $("#cnic").addClass("error");
    }
  
    //address
    {
      var address = $("#address").val();
      if (
        address.match("^[a-zA-Z'-pL]+(?:(?! {2})[a-zA-Z'-pL ])*[a-zA-Z'-pL]+$")
      ) {
        $("#address").removeClass("error");
        g = true;
      } else {
        $("#address").addClass("error");
      }
    }
  
    if (
      a == true &&
      b == true &&
      c == true &&
      d == true &&
      e == true &&
      f == true &&
      g == true &&
      h == true
    ) {
      console.log("success");
      return true;
    } else {
      console.log("fail");
      return false;
    }
  }
  
  function Reset() {
    $(
      "#name, #age, #city-names, #radio, #num, #email, #cnic, #address"
    ).removeClass("error");
    $("#name").val("");
    $("#radio").children("input").prop("checked", false);
    $("#age").val("");
    $("#city-names").val("");
    $("#num").val("");
    $("#email").val("");
    $("#cnic").val("");
    $("#address").val("");
  }
  
  function onDelete(i, e) {
    var tag = e.target;
    var ptag = tag.parentNode;
    var pptag = ptag.parentNode;
    pptag.parentNode.removeChild(pptag);
    localStorage.removeItem("arr" + [i]);
  }
  