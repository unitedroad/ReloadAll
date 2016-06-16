/*
 *
 *  Reload All! Mozilla Firefox Addon - This is the core addon JavaScript file
 *
 *  Copyright (C) 2009  Dhruwat Bhagat <unitedronaldo@yahoo.com>
 *
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 */

if (!reloadall)
	var reloadall = {
		reloadAll : function(event) {
			try {
				if (event == null
						|| event.target == null
						|| event.target.tagName == null
						|| ((event.target.tagName == "toolbarbutton") || event.target.id == "reloadall-menuitem-reloadall")) {
					getBrowser().reloadAllTabs();
				}

			} catch (exception) {
				var reloadAllMenuItem = document
						.getElementById("reloadall-menuitem-reloadall");
				reloadAllMenuItem.setAttribute("label", "exception");

			}

		},
		reloadAllAppTabs : function(event) {
			try {
				var gBrowser = getBrowser();
				var numTabs = gBrowser.browsers.length;
				for ( var index = 0; index < numTabs; index++) {
					var tab = gBrowser.tabs[index];
					if (tab.pinned) {
						gBrowser.getBrowserAtIndex(index).reload();
					}
				}
			} catch (exception) {
				var reloadAllMenuItem = document
						.getElementById("reloadall-menuitem-reloadall");
				reloadAllMenuItem.setAttribute("label", "exception");
			}

		},
		stopAll : function() {
			try {
				var gBrowser = getBrowser();
				var numTabs = gBrowser.browsers.length;
				for ( var index = 0; index < numTabs; index++) {
					gBrowser.getBrowserAtIndex(index).stop();
				}

			} catch (exception) {
				var reloadAllMenuItem = document
						.getElementById("reloadall-menuitem-reloadall");
				reloadAllMenuItem.setAttribute("label", "exception");
				alert("Exception: " + e);
			}

		},
		reloadAllByShortcut : function(event) {
			getBrowser().reloadAllTabs();

		},

		reloadAllSaved : function() {
			var tabsLastReloaded = this.tabsLastReloaded;
			if (tabsLastReloaded != null) {
				for ( var i = 0; i < tabsLastReloaded.length; i++) {
					tabsLastReloaded[i].reload();
				}
			}
		},

		closeWindow : function() {
			window.close();
		},
		openSelectionPopup : function() {
			window.open("chrome://reloadall/content/reloadallPopup.xul",
					"reloadall-seltabs", "chrome");
		},

		tabsLastReloaded : new Array(),

		setTabsLastReloaded : function(tabsLastReloaded) {
			this.tabsLastReloaded = tabsLastReloaded;
		},

	}
function reloadAll_init() {
	try {
		var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefBranch);
		var reloadAllPref = prefManager
				.getCharPref("extensions.reloadall.reloadall");
		var reloadAllKey = document.getElementById("reloadall-key");
		reloadAllKey.setAttribute("key", reloadAllPref);
		var reloadAllAppTabsPref = prefManager
				.getCharPref("extensions.reloadall.reloadallapptabs");
		var reloadAllAppTabsKey = document.getElementById("reloadallapptabs-key");
		reloadAllAppTabsKey.setAttribute("key", reloadAllAppTabsPref);
		var selectionPopupPref = prefManager
				.getCharPref("extensions.reloadall.reloadallpopup");
		var selectionPopupKey = document.getElementById("selectionpopup-key");
		selectionPopupKey.setAttribute("key", selectionPopupPref);
		var reloadAllSavedPref = prefManager
				.getCharPref("extensions.reloadall.reloadallsaved");
		var reloadAllSavedKey = document.getElementById("reloadallsaved-key");
		reloadAllSavedKey.setAttribute("key", reloadAllSavedPref);
		var stopAllPref = prefManager
				.getCharPref("extensions.reloadall.stopall");
		var stopAllKey = document.getElementById("stopall-key");
		stopAllKey.setAttribute("key", stopAllPref);
		var addToTabContext = prefManager
				.getBoolPref("extensions.reloadall.addtotabcontextmenu");
		var addReloadAllSavedToTabContext = prefManager
				.getBoolPref("extensions.reloadall.addReloadAllSavedtotabcontextmenu");
		var addSelectTabsToTabContext = prefManager
				.getBoolPref("extensions.reloadall.addSelectionPopuptotabcontextmenu");
		var addStopAllToTabContext = prefManager
				.getBoolPref("extensions.reloadall.addStopAlltotabcontextmenu");
		var addReloadAllAppTabsToTabContextPref = prefManager
				.getBoolPref("extensions.reloadall.addReloadAllAppTabstotabcontextmenu");
			
		var tabbrowser = getBrowser();
		var originalReloadAllMenuItem = document
				.getElementById("context_reloadAllTabs");
		var insertPosition = originalReloadAllMenuItem.nextSibling;
		
		var tabContext = document.getAnonymousElementByAttribute(
			tabbrowser, "anonid", "tabContextMenu");
		if (tabContext==null) {  //Dhruv -  this means we are on 4.0
			var tabContext = tabbrowser.tabContextMenu;
		}
		
		if (Application.version < 4.0) {
			document.getElementById("reloadall-menuitem-reloadallAppTabs").style.display = 'none';
		} else {
			if (addReloadAllAppTabsToTabContextPref) {
				var reloadAllAppTabspMenuItem = document.getElementById(
						"reloadall-menuitem-reloadallAppTabs").cloneNode(true);
				reloadAllAppTabspMenuItem.setAttribute("id",
						"reloadall-menuitem-reloadallAppTabs-context");
				reloadAllAppTabspMenuItem.setAttribute("key", "");	
				tabContext.insertBefore(reloadAllAppTabspMenuItem, insertPosition);
			}
			
		}
		
		if (addSelectTabsToTabContext){
			// exhibits programmer's laziness but well ....
			var selectionPopupMenuItem = document.getElementById(
					"reloadall-menuitem-selecttabs").cloneNode(true);
			selectionPopupMenuItem.setAttribute("id",
					"reloadall-menuitem-selecttabs-context");
			selectionPopupMenuItem.setAttribute("key", "");	
			tabContext.insertBefore(selectionPopupMenuItem, insertPosition);
		}
		
		if (addStopAllToTabContext) {
			var stopAllMenuItem = document.getElementById(
					"reloadall-menuitem-stopall").cloneNode(true);
			stopAllMenuItem.setAttribute("id",
					"reloadall-menuitem-stopall-context");
			stopAllMenuItem.setAttribute("key", "");
			tabContext.insertBefore(stopAllMenuItem, insertPosition);
		}
		
		if (addReloadAllSavedToTabContext) {
			var reloadAllSavedMenuItem = document.getElementById(
					"reloadall-menuitem-reloadallsaved").cloneNode(true);
			reloadAllSavedMenuItem.setAttribute("id",
					"reloadall-menuitem-reloadallsaved-context");
			reloadAllSavedMenuItem.setAttribute("key", "");
			tabContext.insertBefore(reloadAllSavedMenuItem, insertPosition);
		}
		var reloadAllMenuItem = document
				.getElementById("reloadall-menuitem-reloadall");
		

		
		
		// tabContext.insertBefore(reloadAllMenuItem, insertPosition); //
		// Already have Firefox's reloadall menu item, don't need ours here
			


		
	} catch (exception) {

	}

	window.removeEventListener("load", reloadAll_init, false);
}
window.addEventListener("load", reloadAll_init, false);
