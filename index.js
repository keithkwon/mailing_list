const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { mainModule } = require("process");
const app = express();
const port = process.env.PORT;
const listId = "3843cf1264";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mailchimp.setConfig({
  apiKey: "9fd6b65103b9e50d4bedeb04e3933f4e-us18",
  server: "us18",
});

app.listen(port || 3000, () => {
  console.log("listening");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/signup.html"));
});

app.post("/", (req, res) => {
  console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: emailAddress,
  };

  async function run() {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });
      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );
      res.sendFile(__dirname + "/success.html");
    } catch (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }
  }

  run();
});
