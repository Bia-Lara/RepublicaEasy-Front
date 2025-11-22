export default function ProfilePhoto({ src }) {
  return (
    <img
      src={src || "https://i.imgur.com/6VBx3io.png"}
      alt="Foto do usuário"
      className="w-40 h-40 rounded-full object-cover shadow-md"
    />
  );
}
