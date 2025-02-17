const boldWords = (text, words) => {
  const parts = String(text)?.split(' ');
  return parts.map((part, index) => (
    <span key={index} className={words.includes(part) ? 'font-[bold]' : ''}>
      {index > 0 ? ' ' : ''}
      {part}
    </span>
  ));
};

function AppText({text = '', classes = '', wordsBold = [], children}) {
  return (
    <p className={`m-0 p-0 text-black ${classes}`}>
      {text && boldWords(text, wordsBold)} {children}
    </p>
  );
}

export default AppText;
