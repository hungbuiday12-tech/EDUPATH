import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.send("EDUPATH AI SERVER đang hoạt động!");
});

app.post("/api/ai", async (req, res) => {

    try {

        const question = req.body.question;

        if (!question || question.trim() === "") {
            return res.status(400).json({
                error: "Bạn chưa nhập câu hỏi."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5-mini",

            instructions: `
Bạn là AI Trợ giảng của EDUPATH.

Bạn hỗ trợ học sinh THCS lớp 6 đến lớp 9.

Các môn học gồm:
Toán, Tiếng Anh, Vật lí, Hóa học, Sinh học và Tin học.

Hãy trả lời bằng tiếng Việt nếu học sinh hỏi bằng tiếng Việt.

Hãy giải thích đơn giản, rõ ràng và phù hợp với học sinh THCS.

Nếu học sinh hỏi bài tập:
- Phân tích đề.
- Trình bày từng bước.
- Giải thích cách làm.
- Cuối cùng đưa ra đáp án.

Nếu câu hỏi không rõ, hãy hỏi lại.

Nếu không chắc chắn về thông tin, hãy nói rõ thay vì tự bịa.
`,

            input: question
        });

        res.json({
            answer: response.output_text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message || "AI đang gặp lỗi."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("EDUPATH AI SERVER đang chạy!");
});