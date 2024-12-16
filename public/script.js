const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

const verifyTextLength = (e) => {
  const textLength = e.target.value.length;
  if (textLength > 200 && textLength < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

if (textArea) {
  textArea.addEventListener("input", verifyTextLength);
}

const submitData = async () => {
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer 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"
  );

  const raw = JSON.stringify({
    text_to_summarize: text_to_summarize,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("http://localhost:3000/summarize", requestOptions);
    if (response.ok) {
      const result = await response.text();
      summarizedTextArea.value = result || "No summary available.";
    } else {
      summarizedTextArea.value = "Failed to fetch summary.";
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    summarizedTextArea.value = "An error occurred while summarizing.";
    console.error(error);
  } finally {
    submitButton.classList.remove("submit-button--loading");
  }
};

if (submitButton) {
  submitButton.addEventListener("click", submitData);
  submitButton.disabled = true;
}
