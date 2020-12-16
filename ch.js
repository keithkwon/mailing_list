import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: "9fd6b65103b9e50d4bedeb04e3933f4e-us18",
  server: "us18",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();
