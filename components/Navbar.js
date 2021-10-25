/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { supabase } from "../utils/supabaseClient";

const session = supabase.auth.session();

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { publicURL, error } = supabase.storage
    .from("avatars")
    .getPublicUrl(`private/${session.user.id}`);
  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-4">
            {/* Default Height - h-16 */}
            <div className={`flex justify-between h-16`}>
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* App's name homepage url */}
                <div className="flex-shrink-0 flex items-center">
                  <a href="#" className="flex-shrink-0">
                    <h2 className="text-xl text-gray-900 font-semibold">
                      Supabase To Do List
                    </h2>
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* Mobile CTA Button */}
                  <a href="#">
                    <button
                      type="button"
                      className="relative md:invisible inline-flex items-center px-3 py-1.5 border border-transparent text-base font-medium rounded text-white bg-blue-600 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span>CTA Button</span>
                    </button>
                  </a>
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <Menu as="div" className="ml-3 relative">
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                      {/* Desktop Navigation Button */}
                      <a href="#" type="button">
                        <span className="mr-4 relative inline-flex items-center px-2 py-1 border border-transparent text-base font-medium rounded text-gray-600 bg-transparent shadow-none hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                          One
                        </span>
                      </a>

                      {!session ? (
                        <a href="#">
                          <button
                            type="button"
                            className="relative hidden:onlyMobile inline-flex items-center px-3 py-1.5 border border-transparent text-base font-medium rounded text-white bg-blue-600 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            {/* Desktop CTA Button */}
                            <span>CTA Button</span>
                          </button>
                        </a>
                      ) : (
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Account settings
                                    </a>
                                  )}
                                </Menu.Item>
                                <form method="POST" action="#">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        type="submit"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block w-full text-left px-4 py-2 text-sm"
                                        )}
                                      >
                                        Sign out
                                      </button>
                                    )}
                                  </Menu.Item>
                                </form>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      )}
                    </div>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            {/* Mobile Navigation Button */}
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="text-gray-600 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                One
              </a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
