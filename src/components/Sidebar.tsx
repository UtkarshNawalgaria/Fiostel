const Sidebar = ({ children, sidebar, showSidebar }: any) => {
  return (
    <aside
      className={
        'bg-white w-64 h-screen fixed top-0 right-0 overflow-auto transform md:hidden ease-in-out transition-all duration-300 z-40 shadow-lg ' +
        (sidebar ? 'translate-x-0' : 'translate-x-96')
      }
    >
      <div
        className="h-8 w-8 my-9 flex content-end cursor-pointer"
        onClick={showSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div>{children}</div>
    </aside>
  )
}

export default Sidebar
