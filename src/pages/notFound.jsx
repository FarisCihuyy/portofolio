import React from "react";

const NotFound = () => {
  return (
    <main className="h-screen flex justify-center items-center font-CabinetGrotesk">
      <div className="space-y-4">
        <h1 className="text-[15cqw] font-bold leading-none">
          404.<span className="text-[5cqw]">NotFound</span>{" "}
        </h1>
        <p className="text-[2cqw]">
          This isn’t the page you were looking for.{" "}
          <a href="/" className="text-indigo-600 underline">
            Go Home..
          </a>{" "}
        </p>
      </div>
    </main>
  );
};

export default NotFound;
