function sendMailto(event) {
  event.preventDefault();
  const form = event.target;
  const subject = encodeURIComponent("Message from website: " + form.name.value.trim());
  const body = encodeURIComponent("Name: " + form.name.value.trim() + "\nEmail: " + form.email.value.trim() + "\n\n" + form.message.value.trim());
  window.location.href = "mailto:muhammettopal29@arizona.edu?subject=" + subject + "&body=" + body;
  return false;
}
function copyCurrentLink() {
  navigator.clipboard.writeText(window.location.href);
  const btn = document.getElementById("copyLinkButton");
  if (btn) {
    const old = btn.textContent;
    btn.textContent = "Copied";
    setTimeout(() => btn.textContent = old, 1400);
  }
}
