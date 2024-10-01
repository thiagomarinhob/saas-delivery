import { Nav } from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-4">
      <Nav
        links={[
          {
            title: "Inbox",
            label: "128",
            variant: "default",
          },
          {
            title: "Drafts",
            label: "9",
            // icon: File,
            variant: "ghost",
          },
          {
            title: "Sent",
            label: "",
            // icon: Send,
            variant: "ghost",
          },
          {
            title: "Junk",
            label: "23",
            // icon: ArchiveX,
            variant: "ghost",
          },
          {
            title: "Trash",
            label: "",
            // icon: Trash2,
            variant: "ghost",
          },
          {
            title: "Archive",
            label: "",
            // icon: Archive,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
