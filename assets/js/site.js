function copyCurrentLink() {
  navigator.clipboard.writeText(window.location.href);
  const btn = document.getElementById("copyLinkButton");
  if (btn) {
    const old = btn.textContent;
    btn.textContent = "Copied";
    setTimeout(() => btn.textContent = old, 1400);
  }
}
