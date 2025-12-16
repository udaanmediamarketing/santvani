import bcrypt from "bcryptjs";

const plain = "Admin@123";
const hash = "$2b$10$y1wwB4qwTEu.QLphBbHb4OWZ5JYY9YxJxnWk7MP7QxpjmLKB.La42";

(async () => {
  const match = await bcrypt.compare(plain, hash);
  console.log("MATCH:", match);
})();
