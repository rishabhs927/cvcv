import "./About.css";
import "./Desktop.css";
import "./Folder.css";
import "./Media.css";
import "./Note.css";
import "./Player.css";
import "./Sticky.css";
import "./Styles.css";
import "./Window.css";

export const metadata = {
  title: "About- Rishabh Sharma",
  description: "",
  icons: {
    icon: '/content/media/banner.JPEG',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
