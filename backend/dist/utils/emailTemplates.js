import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendSignupApprovalEmail = async ({ to, name, }) => {
    const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to,
        subject: "तुमचे खाते मंजूर झाले आहे 🎉",
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      //  <img
      //     src="./images/banner.png"
      //     alt="विश्व संत साहित्य"
      //     style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;"
      //   />
        <h2>नमस्कार ${name},</h2>

        <p>
          आनंदाची बातमी! 🎉  
          तुमचे खाते <b>Admin कडून मंजूर</b> करण्यात आले आहे.
        </p>

        <p>
          आता तुम्ही तुमच्या ई-मेल आणि पासवर्ड वापरून लॉगिन करू शकता.
        </p>

        <a
          href="https://www.vishwsantsahitya.com/signin"
          style="
            display: inline-block;
            margin-top: 16px;
            padding: 10px 16px;
            background-color: #f97316;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          "
        >
          लॉगिन करा
        </a>

        <br /><br />
        <p>धन्यवाद,<br/>विश्व संत साहित्य टीम</p>
        // <img
        //   src="./images/logo.jpg"
        //   alt="SantVani Logo"
        //   className="h-10 w-auto object-contain"
        // />
      </div>
    `,
    });
    if (error) {
        console.error("❌ Resend error:", error);
        throw error;
    }
    console.log("✅ Email sent:", data);
};
export const sendSignUpRejectionEmail = async ({ to, name, }) => {
    await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to,
        subject: "तुमची नोंदणी मंजूर झाली नाही ❌",
        html: `
      <div style="font-family: Arial; line-height: 1.6">
        <h2>नमस्कार ${name},</h2>

        <p>
          तुमची नोंदणी तपासल्यानंतर, सध्या तुमचे खाते
          <b>मंजूर करता येत नाही</b>.
        </p>

       <p>जर तुम्हाला अधिक माहिती हवी असेल, तर कृपया Admin शी संपर्क साधा.</p>

        <br />
        <p>धन्यवाद,<br/>विश्व संत साहित्य टीम</p>
        <img
          src="/images/logo.jpg"
          alt="SantVani Logo"
          className="h-10 w-auto object-contain"
        />
      </div>
    `,
    });
};
//# sourceMappingURL=emailTemplates.js.map