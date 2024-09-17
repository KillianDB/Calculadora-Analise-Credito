import "./sidemenu.css";

interface SideMenuProps {
	type: string;
}

export function SideMenu(side: SideMenuProps) {
	return (
		<aside className='asideSideMenu'>
			<nav className='navSideMenu'>
				{side.type == "admin" ? (
					<ul className='ulSideMenu'>
						<li className='liSideMenu'>
							<a className='aSideMenu' href='/home/admin'>
								Home
							</a>
						</li>
						<li className='liSideMenu'>
							<a className='aSideMenu' href='/equipes'>
								Equipes
							</a>
						</li>
						<li className='liSideMenu'>
							<a className='aSideMenu' href='/bancos'>
								Bancos
							</a>
						</li>
					</ul>
				) : (
					<ul className='ulSideMenu'>
						<li className='liSideMenu'>
							<a className='aSideMenu' href='/home'>
								Home
							</a>
						</li>
						<li className='liSideMenu'>
							<a className='aSideMenu' href='/calculadora'>
								Calculadora
							</a>
						</li>
						<li className='liSideMenu'>
							<a className='aSideMenu' href='/perfil'>
								Perfil
							</a>
						</li>
					</ul>
				)}

				<button className='buttonSideMenu'>Logout</button>
			</nav>
		</aside>
	);
}
