import "./sidemenu.css";

interface SideMenuProps {
	type: string;
}

export function SideMenu(side: SideMenuProps) {
	return (
		<aside className='asideSideMenu'>
			<img
				src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
				id='admin-home-logo'
			/>
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
