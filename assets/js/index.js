$("#add_user").submit(function(event) {
    alert("Data inserted successfully!");
});

// Fixing the update_user form submission
$("#update_user").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n, i) {
        data[n["name"]] = n["value"];
    });

    console.log(data);

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`, // Fixed string interpolation
        "method": "PUT",
        "data": data
    };

    $.ajax(request).done(function(response) { // Fixed function syntax
        alert("Data updated successfully");
    });
});

if (window.location.pathname == "/") {
    var $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:3000/api/users/${id}`, // Fixed string interpolation
            "method": "DELETE"
        };

        if (confirm("Do you really want to delete this data?")) {
            $.ajax(request)
                .done(function (response) { // Fixed function syntax
                    alert("Data deleted successfully");
                    location.reload(); // Fixed reload syntax
                })
                .fail(function (err) { // Added error handling
                    alert("Error deleting data!");
                    console.log(err);
                });
        }
    });
}
