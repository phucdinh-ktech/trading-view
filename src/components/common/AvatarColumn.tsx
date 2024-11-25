type AvatarProps = {
  name: string;
  size?: number; // Kích thước avatar (mặc định: 40)
  backgroundColor?: string; // Màu nền tùy chỉnh (mặc định: không, dùng Tailwind class)
  textColor?: string; // Màu chữ tùy chỉnh (mặc định: không, dùng Tailwind class)
};

const AvatarColumn = ({
  name,
  size = 40,
  backgroundColor,
  textColor,
}: AvatarProps) => {
  // Lấy chữ cái đầu từ chuỗi
  const initial = name.trim().charAt(0).toUpperCase();

  // Tùy chỉnh kích thước dựa trên Tailwind
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size / 2}px`,
    lineHeight: `${size}px`,
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full font-bold uppercase ${
        backgroundColor ? "" : "bg-blue-500"
      } ${textColor ? "" : "text-white"}`}
      style={avatarStyle}
    >
      {initial}
    </div>
  );
};

export default AvatarColumn;
