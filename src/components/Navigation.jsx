import supabase from "../services/supabase";
import {Fragment, useEffect, useState} from 'react';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {HiCalendarDays} from 'react-icons/hi2';
import {NavLink, useLocation} from 'react-router-dom';

const navigation = [
    {name: 'Inicio', href: '/', current: true},
    {name: 'Reserva tu cita', href: '/booking', current: false},
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
    const location = useLocation();
    const [appointmentCount, setAppointmentCount] = useState(0);

    function isActiveRoute(href, location) {
        return location.pathname === href;
    }

    const getAppointmentsForToday = async () => {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // Start of today
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59); // End of today

        const {data, error} = await supabase
            .from('appointments')
            .select('*')
            .gte('date', startOfDay.toISOString().split('T')[0]) // Filter for today's date or greater than start of today
            .lt('date', endOfDay.toISOString().split('T')[0]); // Filter for today's date or less than end of today

        if (error) {
            console.error('Error fetching appointments:', error);
            return;
        }

        const count = data ? data.length : 0; // Retrieve the count of appointments for today
        setAppointmentCount(count);
    };

    useEffect(() => {
        getAppointmentsForToday();
    }, [appointmentCount]);


    return (
        <nav>
            <Disclosure as="nav" className="bg-gray-800 ">
                {({open}) => (
                    <Fragment>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <Disclosure.Button
                                        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5"/>
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div
                                    className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block ">
                                        <div className="flex space-x-4 ">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                                                        isActiveRoute(item.href, location)
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                    }`}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-y-0 right-0 flex gap-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white
                                    focus:outline-none  "
                                    >
                                        <span className="absolute -inset-1.5">
                                            <span
                                                className="notification-badge"
                                            >
                                                    {appointmentCount}
                                            </span>
                                        </span>

                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-7 w-7" aria-hidden="true"/>
                                    </button>
                                    <NavLink
                                        to="/calendar"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">Calendar</span>
                                        <HiCalendarDays className="h-7 w-7" aria-hidden="true"/>
                                    </NavLink>
                                    <Menu as="div" className="relative ml-3">
                                        <Menu.Button
                                            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5"/>
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full object-cover"
                                                src="https://fqpnunykkdxvsmgpebdq.supabase.co/storage/v1/object/sign/avatars/prix.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3ByaXguanBnIiwiaWF0IjoxNzAwMDc0MTE3LCJleHAiOjE3MzE2MTAxMTd9.intS8AOkwKKiQm-snz2t7CM0_ov2uduyDq3mDPywS_o&t=2023-11-15T18%3A53%3A09.368Z"
                                                alt="Doctora Priscilla Rodriguez"
                                            />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    <NavLink
                                                        to="/profile"
                                                        className={classNames('block px-4 py-2 text-sm text-gray-700', location.pathname === '/profile' ? 'bg-gray-100' : '')}
                                                    >
                                                        Your Profile
                                                    </NavLink>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <NavLink
                                                        to="/settings"
                                                        className={classNames('block px-4 py-2 text-sm text-gray-700', location.pathname === '/settings' ? 'bg-gray-100' : '')}
                                                    >
                                                        Settings
                                                    </NavLink>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <NavLink
                                                        to="/signout"
                                                        className={classNames('block px-4 py-2 text-sm text-gray-700', location.pathname === '/signout' ? 'bg-gray-100' : '')}
                                                    >
                                                        Sign out
                                                    </NavLink>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                            location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        )}
                                        aria-current={location.pathname === item.href ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </Fragment>
                )}
            </Disclosure>
        </nav>
    );
}
