import { User } from "@/model/user/User";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type ProfileProps = {
  user: User;
  questionsLength: number;
};

export const Profile: React.FC<ProfileProps> = ({
  user,
  questionsLength = 0,
}) => {
  const formattedCreatedAt = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(user.createdAt));

  return (
    <div className="flex flex-col order-1 lg:order-3 gap-6 bg-gray-700 px-6 py-8 rounded-2xl border-2 border-gray-200 h-fit md:sticky md:top-20">
      <p className="text-white text-center text-2xl font-bold mx-auto">
        الملف الشخصي
      </p>

      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faUserCircle} size="4x" className="text-white" />

        <div className="flex flex-col gap-2">
          <p className="text-white text-base">
            <strong>الاسم: </strong>
            {user.name}
          </p>

          <p className="text-white text-base">
            <strong>تاريخ الانضمام: </strong>
            {formattedCreatedAt}
          </p>

          <p className="text-white text-base">
            <strong>عدد الأسئلة: </strong>
            {questionsLength}
          </p>
        </div>
      </div>
    </div>
  );
};
