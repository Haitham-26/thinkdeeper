import { Message as MessageModel } from "@/model/message/types/Message";
import { formattedDate } from "@/tools/Date";
import { Icon } from "@/app/components/Icon";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons/faUserSecret";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";

type Props = {
  message: MessageModel;
};

export default function Message({ message }: Props) {
  const isAnonymous = !message.name;

  return (
    <div className="group bg-surface rounded-[2.5rem] border-2 border-border p-6 md:p-8 hover:border-accent/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
            isAnonymous
              ? "bg-surface-muted text-text-muted"
              : "bg-accent/10 text-accent"
          }`}
        >
          <Icon
            icon={isAnonymous ? faUserSecret : faCircleUser}
            className="text-xl"
          />
        </div>
        <div>
          <h4 className="text-base font-black text-text-primary">
            {message.name || "مجهول الهوية"}
          </h4>
          <div className="flex items-center gap-2 text-[11px] text-text-muted font-bold">
            <Icon icon={faCalendar} className="text-[10px]" />
            <span className="dir-ltr">{formattedDate(message.createdAt)}</span>
          </div>
        </div>
      </div>

      <p className="ps-15 pt-3 text-lg md:text-xl text-text-primary leading-relaxed font-medium whitespace-pre-wrap">
        {message.message}
      </p>
    </div>
  );
}
