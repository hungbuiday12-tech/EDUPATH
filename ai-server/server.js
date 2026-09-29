import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
    res.send("EDUPATH AI SERVER đang hoạt động!");
});

async function generateAI(question) {

    const maxAttempts = 4;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

        try {

            console.log(
                `Gemini attempt ${attempt}/${maxAttempts}`
            );

            const response =
                await ai.models.generateContent({

                    model: "gemini-2.5-flash",

                    contents: question,

                    config: {

                        systemInstruction: `
Bạn là AI Trợ giảng của EDUPATH.

Bạn hỗ trợ học sinh THCS lớp 6 đến lớp 9
và học sinh ôn tuyển sinh vào lớp 10.

Các môn học gồm:

- Toán
- Tiếng Anh
- Vật lí
- Tin học
- Ôn luyện tuyển sinh 10

Hãy trả lời bằng tiếng Việt nếu học sinh
hỏi bằng tiếng Việt.

Hãy giải thích đơn giản, rõ ràng,
phù hợp với học sinh THCS.

KHI HỌC SINH HỎI BÀI TẬP:

- Phân tích đề.
- Xác định kiến thức cần sử dụng.
- Trình bày từng bước.
- Giải thích rõ cách làm.
- Cuối cùng đưa ra đáp án.

KHI HỌC SINH GỬI BÀI LÀM HOẶC CÂU TRẢ LỜI SAI:

- Xác định chính xác chỗ sai.
- Chỉ ra bước hoặc ý bị sai.
- Giải thích vì sao sai.
- Nêu kiến thức đúng cần nhớ.
- Hướng dẫn cách sửa.
- Đưa ra cách kiểm tra để tránh lặp lại lỗi tương tự.

KHI HỌC SINH GỬI NHIỀU CÂU HỎI
HOẶC KẾT QUẢ BÀI LUYỆN:

- Xác định những câu sai.
- Phân loại các lỗi sai.
- Tìm những dạng kiến thức học sinh
  còn yếu.
- Giải thích những lỗi thường gặp.
- Đề xuất nội dung nên ôn tập.

KHI HỌC SINH ÔN TUYỂN SINH 10:

- Ưu tiên kiến thức phù hợp với việc
  ôn thi vào lớp 10.
- Giải thích từng bước.
- Có thể phân tích lỗi sai trong
  bài luyện tập và bài thi thử.
- Nếu học sinh gửi kết quả bài thi,
  hãy giúp phân tích những phần cần cải thiện.

ĐỐI VỚI TOÁN:

- Trình bày công thức nếu cần.
- Không bỏ qua các bước quan trọng.
- Nếu có nhiều cách giải, ưu tiên cách
  dễ hiểu đối với học sinh THCS.

ĐỐI VỚI TIẾNG ANH:

- Giải thích từ vựng, ngữ pháp và cách dùng.
- Nếu học sinh làm sai, chỉ ra lỗi ngữ pháp
  hoặc cách dùng từ.

ĐỐI VỚI VẬT LÍ:

- Nêu công thức.
- Giải thích các đại lượng.
- Đổi đơn vị nếu cần.
- Trình bày cách thay số và kết quả.

ĐỐI VỚI TIN HỌC:

- Giải thích thuật toán hoặc kiến thức
  theo cách dễ hiểu.
- Nếu học sinh gửi code, xác định lỗi,
  giải thích nguyên nhân và hướng sửa.

Nếu câu hỏi không rõ:
hãy hỏi lại học sinh.

Nếu không chắc chắn về thông tin:
hãy nói rõ thay vì tự bịa.

Không được cố tình làm bài quá phức tạp
nếu có cách giải đơn giản hơn.
`
                    }

                });

            console.log("Gemini response received.");

            return response.text;

        }

        catch (error) {

            console.error(
                `Gemini attempt ${attempt} failed:`,
                error.message || error
            );

            if (attempt < maxAttempts) {

                const delay =
                    2000 * Math.pow(2, attempt - 1);

                console.log(
                    `Retrying after ${delay}ms...`
                );

                await new Promise(
                    resolve => setTimeout(
                        resolve,
                        delay
                    )
                );

            }

            else {

                throw error;

            }

        }

    }

}

app.post("/api/ai", async (req, res) => {

    try {

        const question = req.body.question;

        if (
            !question ||
            question.trim() === ""
        ) {

            return res.status(400).json({
                error: "Bạn chưa nhập câu hỏi."
            });

        }

        console.log(
            "Question:",
            question
        );

        const answer =
            await generateAI(question);

        res.json({
            answer: answer
        });

    }

    catch (error) {

        console.error(
            "FINAL AI ERROR:",
            error
        );

        const status =
            error.status || 500;

        res.status(status).json({

            error:
                status === 503
                    ? "Gemini đang quá tải. Bạn hãy thử lại sau một chút."
                    : (
                        error.message ||
                        "AI đang gặp lỗi."
                    )

        });

    }

});

const PORT =
    process.env.PORT || 3000;

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `EDUPATH AI SERVER đang chạy trên port ${PORT}!`
        );

    }
);
