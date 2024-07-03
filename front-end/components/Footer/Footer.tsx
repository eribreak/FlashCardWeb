"use client"
function Footer() {
  return (
    <div className="w-screen border-t-[0.5px] border-gray-300 px-10 pt-5 flex gap-32 justify-center">
        <div className="flex flex-col p-4">
          <h1 className="font-semibold text-xl mb-7">About us</h1>
          <ul className="font-medium flex flex-col gap-5">
            <li>About Quiz</li>
            <li>How Quiz works</li>
            <li>Advertise with us</li>
            <li>More information</li>
          </ul>
        </div>

        <div className="flex flex-col p-4">
          <h1 className="font-semibold text-xl mb-7">For students</h1>
          <ul className="font-medium flex flex-col gap-5">
            <li>Flashcards</li>
            <li>Collections</li>
            <li>How to join class</li>
          </ul>
        </div>

        <div className="flex flex-col p-4">
          <h1 className="font-semibold text-xl mb-7">For Teacher</h1>
          <ul className="font-medium flex flex-col gap-5">
            <li>Posts</li>
            <li>Create assignment</li>
            <li>Class manage</li>
          </ul>

        </div>

        <div className="flex flex-col p-4">
          <h1 className="font-semibold text-xl mb-7">Resource</h1>
          <ul className="font-medium flex flex-col gap-5">
            <li>Help center</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div>
        </div>
    </div>
  )
}

export default Footer