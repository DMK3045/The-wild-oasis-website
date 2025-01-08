'use client';

import Link from 'next/link';
import { CiMenuFries } from 'react-icons/ci';
import { useState } from 'react';

export default function Navigation({ session }) {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="z-10 text-xl ">
      <ul className="hidden md:flex md:justify-center md:gap-16 md:items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-8"
            >
              <span>Guest area</span>
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
      <CiMenuFries
        onClick={() => setToggle(!toggle)}
        className="text-xl md:hidden block text-primary-50 "
      />
      <div
        onClick={() => setToggle(!toggle)}
        className={`w-full h-screen bg-primary-950 transition-all bg-opacity-0 fixed top-0 ${
          toggle
            ? 'right-0 duration-500 ease-in'
            : 'right-[-100] duration-300 ease-in-out'
        }right-0 md:hidden z-30 flex justify-end`}
      >
        <div className="bg-primary-900 w-56 h-full">
          <ul className="h-full flex flex-col justify-center gap-16 items-center">
            <li>
              <Link
                href="/cabins"
                className="hover:text-accent-400 transition-colors"
              >
                Cabins
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-accent-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              {session?.user?.image ? (
                <Link
                  href="/account"
                  className="hover:text-accent-400 transition-colors flex items-center gap-8"
                >
                  <span>Guest area</span>
                  <img
                    className="h-8 rounded-full"
                    src={session.user.image}
                    alt={session.user.name}
                    referrerPolicy="no-referrer"
                  />
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="hover:text-accent-400 transition-colors"
                >
                  Guest area
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
