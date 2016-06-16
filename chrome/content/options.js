/*
 *
 *  Reload All! Mozilla Firefox Addon - This is the JavaScript file for options
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

if (!optionsmethods) var optionsmethods = {};

optionsmethods = {
	load : function() 
	{
		var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefBranch);
		var reloadAllPref = prefManager.getCharPref("extensions.reloadall.reloadall");
		var reloadAllAppTabsPref = prefManager.getCharPref("extensions.reloadall.reloadallapptabs");
		var selectionPopupPref = prefManager.getCharPref("extensions.reloadall.reloadallpopup");
		var reloadAllSavedPref = prefManager.getCharPref("extensions.reloadall.reloadallsaved");
		var stopAllPref = prefManager.getCharPref("extensions.reloadall.stopall");
		
		var addToTabContextPref = prefManager.getBoolPref("extensions.reloadall.addtotabcontextmenu");
		var addReloadAllAppTabsToTabContextPref = prefManager.getBoolPref("extensions.reloadall.addReloadAllAppTabstotabcontextmenu");
		var addReloadAllSavedToTabContextPref = prefManager.getBoolPref("extensions.reloadall.addReloadAllSavedtotabcontextmenu");
		var addSelectionPopupToTabContextPref = prefManager.getBoolPref("extensions.reloadall.addSelectionPopuptotabcontextmenu");
		var addStopAllToTabContextPref = prefManager.getBoolPref("extensions.reloadall.addStopAlltotabcontextmenu");		
		
		var reloadAllConfigField = document.getElementById("reloadalltabs");
		var reloadAllAppTabsConfigField = document.getElementById("reloadallapptabs");
		var selectionPopupConfigField = document.getElementById("selectionpopup");
		var reloadAllSavedConfigField = document.getElementById("reloadallsaved");
		var stopAllConfigField = document.getElementById("stopall");
		var addToTabContextCheckbox = document.getElementById("appearance-checkbox-contextmenu");
		
		try {
			// this could be cleaner as NOT'ing a null value is not nice
			var addToTabContextMenuPrefNewPrefsFirstTime = !prefManager.getBoolPref("extensions.reloadall.addtotabcontextmenunewprefsnotfirsttime");
		} catch (exception) {
			addReloadAllAppTabsToTabContextPref = addToTabContextPref;
			addReloadAllSavedToTabContextPref = addToTabContextPref;
			addSelectionPopupToTabContextPref = addToTabContextPref;
			addStopAllToTabContextPref = addToTabContextPref;
		}
		
		var addReloadAllAppTabsToTabContextCheckbox = document.getElementById("reloadallapptabs-appearance-checkbox-contextmenu");
		var addReloadAllSavedToTabContextCheckbox = document.getElementById("reloadallsaved-appearance-checkbox-contextmenu");
		var addSelectionPopupToTabContextCheckbox = document.getElementById("selectionpopup-appearance-checkbox-contextmenu");
		var addStopAllToTabContextCheckbox = document.getElementById("stopall-appearance-checkbox-contextmenu");
		
		reloadAllConfigField.setAttribute("value", reloadAllPref);
		reloadAllAppTabsConfigField.setAttribute("value", reloadAllAppTabsPref);
		selectionPopupConfigField.setAttribute("value", selectionPopupPref);
		reloadAllSavedConfigField.setAttribute("value", reloadAllSavedPref);
		stopAllConfigField.setAttribute("value", stopAllPref);
		addToTabContextCheckbox.setAttribute("checked", addToTabContextPref);
		addReloadAllAppTabsToTabContextCheckbox.setAttribute("checked", addReloadAllAppTabsToTabContextPref);
		addReloadAllSavedToTabContextCheckbox.setAttribute("checked", addReloadAllSavedToTabContextPref);
		addSelectionPopupToTabContextCheckbox.setAttribute("checked", addSelectionPopupToTabContextPref);
		addStopAllToTabContextCheckbox.setAttribute("checked", addStopAllToTabContextPref);
		if (Application.version < 4.0) {
			addReloadAllAppTabsToTabContextCheckbox.style.display = 'none';
		}
		
		
	}, 
		
	save : function() 
	{
		var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefBranch);
		var reloadAllConfigField = document.getElementById("reloadalltabs");
		var reloadAllAppTabsConfigField = document.getElementById("reloadallapptabs")
		var selectionPopupConfigField = document.getElementById("selectionpopup");
		var reloadAllSavedConfigField = document.getElementById("reloadallsaved");
		var stopAllConfigField = document.getElementById("stopall");
		var addToTabContextCheckbox = document.getElementById("appearance-checkbox-contextmenu");
		
		var addReloadAllAppTabsToTabContextCheckbox = document.getElementById("reloadallapptabs-appearance-checkbox-contextmenu");
		var addReloadAllSavedToTabContextCheckbox = document.getElementById("reloadallsaved-appearance-checkbox-contextmenu");
		var addSelectionPopupToTabContextCheckbox = document.getElementById("selectionpopup-appearance-checkbox-contextmenu");
		var addStopAllToTabContextCheckbox = document.getElementById("stopall-appearance-checkbox-contextmenu");
		// I don't know why the commented code works in a funny way
	//	var reloadAllPrefNew = reloadAllConfigField.getAttribute("value");
		var reloadAllPrefNew = reloadAllConfigField.value;
		var reloadAllAppTabsPrefNew = reloadAllAppTabsConfigField.value;
	//	var selectionPopupPrefNew = selectionPopupConfigField.getAttribute("value");
	    var selectionPopupPrefNew = selectionPopupConfigField.value;
	//	var reloadAllSavedPrefNew = reloadAllSavedConfigField.getAttribute("value");
		var reloadAllSavedPrefNew = reloadAllSavedConfigField.value;
	//	var stopAllPrefNew =  stopAllConfigField.getAttribute("value");
		var stopAllPrefNew =  stopAllConfigField.value;
		var allShortcutPrefsNew = new Array(); //= reloadAllPrefNew + selectionPopupPrefNew + reloadAllSavedPrefNew + stopAllPrefNew;
		var prefsIndex = 0;
		// Dhruv: logic for duplicate shortcut keys
		if (reloadAllPrefNew!='')
		{
			allShortcutPrefsNew[prefsIndex++] = reloadAllPrefNew;
		}
		if (reloadAllAppTabsPrefNew!='')
		{
			allShortcutPrefsNew[prefsIndex++] = reloadAllAppTabsPrefNew;
		}
		if (selectionPopupPrefNew!='')
		{
			allShortcutPrefsNew[prefsIndex++] = selectionPopupPrefNew;
		}
		if (reloadAllSavedPrefNew!='')
		{
			allShortcutPrefsNew[prefsIndex++] = reloadAllSavedPrefNew;
		}
		if (stopAllPrefNew!='')
		{
			allShortcutPrefsNew[prefsIndex++] = stopAllPrefNew;
		}
		for (var i=0; i <prefsIndex; i++)
		{
			var pref = allShortcutPrefsNew[i];

			for (var j = i+1;j< prefsIndex; j++)
			{
				//var shorcutsbox = document.getElementById("shortcuts-groupbox");
			    //wanted to make it nicer but return false wasn' working for me!
				if (pref == allShortcutPrefsNew[j])
				{
					alert('Select Unique shortcut keys');
			        return false;
				}
			}
		}
		// Dhruv: logic - end
		
	//	var addToTabContextPrefNew = addToTabContextCheckbox.getAttribute("checked");
		var addToTabContextPrefNew = addToTabContextCheckbox.checked;
		var addReloadAllAppTabsToTabContextPrefNew = addReloadAllAppTabsToTabContextCheckbox.checked;
		var addReloadAllSavedToTabContextPrefNew = addReloadAllSavedToTabContextCheckbox.checked;
		var addSelectionPopupToTabContextPrefNew = addSelectionPopupToTabContextCheckbox.checked;
		var addStopAllToTabContextPrefNew = addStopAllToTabContextCheckbox.checked;
		
		try {
			// this could be cleaner as NOT'ing a null value is not nice
			var addToTabContextMenuPrefNewPrefsFirstTime = !prefManager.getBoolPref("extensions.reloadall.addtotabcontextmenunewprefsnotfirsttime");
		} catch (exception) {
			var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefBranch);
			prefManager.setBoolPref("extensions.reloadall.addtotabcontextmenunewprefsnotfirsttime", true);
		}
		prefManager.setCharPref("extensions.reloadall.reloadall", reloadAllPrefNew);
		prefManager.setCharPref("extensions.reloadall.reloadallapptabs", reloadAllAppTabsPrefNew);
		prefManager.setCharPref("extensions.reloadall.reloadallpopup", selectionPopupPrefNew);
		prefManager.setCharPref("extensions.reloadall.reloadallsaved", reloadAllSavedPrefNew);
		prefManager.setCharPref("extensions.reloadall.stopall", stopAllPrefNew);
		prefManager.setBoolPref("extensions.reloadall.addtotabcontextmenu", addToTabContextPrefNew); //Soon to be Deprecated
		prefManager.setBoolPref("extensions.reloadall.addReloadAllAppTabstotabcontextmenu", addReloadAllAppTabsToTabContextPrefNew); 
		prefManager.setBoolPref("extensions.reloadall.addReloadAllSavedtotabcontextmenu", addReloadAllSavedToTabContextPrefNew); 
		prefManager.setBoolPref("extensions.reloadall.addSelectionPopuptotabcontextmenu", addSelectionPopupToTabContextPrefNew); 
		prefManager.setBoolPref("extensions.reloadall.addStopAlltotabcontextmenu", addStopAllToTabContextPrefNew); 
	},
	cancel : function() 
	{

	},
	allTabContextMenuOptionClicked : function()
	{
		var addToTabContextCheckbox = document.getElementById("appearance-checkbox-contextmenu");
		
		var addReloadAllAppTabsToTabContextCheckbox = document.getElementById("reloadallapptabs-appearance-checkbox-contextmenu");
		var addReloadAllSavedToTabContextCheckbox = document.getElementById("reloadallsaved-appearance-checkbox-contextmenu");
		var addSelectionPopupToTabContextCheckbox = document.getElementById("selectionpopup-appearance-checkbox-contextmenu");
		var addStopAllToTabContextCheckbox = document.getElementById("stopall-appearance-checkbox-contextmenu");
		
		var addToTabContextPrefNew = !addToTabContextCheckbox.checked; // since the state hasn't toggled yet
		addReloadAllSavedToTabContextCheckbox.checked = addToTabContextPrefNew;
		addSelectionPopupToTabContextCheckbox.checked = addToTabContextPrefNew;
		addStopAllToTabContextCheckbox.checked = addToTabContextPrefNew;
		addReloadAllAppTabsToTabContextCheckbox.checked = addToTabContextPrefNew;

	},
	
	nonAllTabContextMenuOptionClicked : function(event)
	{
		//var eventSourceCheckbox = window.event.srcElement;
		
		var eventSourceCheckbox = event.target;
		var addToTabContextCheckbox = document.getElementById("appearance-checkbox-contextmenu");
		
		var addReloadAllAppTabsToTabContextCheckbox = document.getElementById("reloadallapptabs-appearance-checkbox-contextmenu");
		var addReloadAllSavedToTabContextCheckbox = document.getElementById("reloadallsaved-appearance-checkbox-contextmenu");
		var addSelectionPopupToTabContextCheckbox = document.getElementById("selectionpopup-appearance-checkbox-contextmenu");
		var addStopAllToTabContextCheckbox = document.getElementById("stopall-appearance-checkbox-contextmenu");
		
		
		var addReloadAllAppTabsToTabPrefNew = addReloadAllAppTabsToTabContextCheckbox.checked;
		var addReloadAllSavedToTabPrefNew = addReloadAllSavedToTabContextCheckbox.checked;
		var addSelectionPopupToTabContextPrefNew = addSelectionPopupToTabContextCheckbox.checked;
		var addStopAllToTabContextPrefNew = addStopAllToTabContextCheckbox.checked;
		
		if (eventSourceCheckbox == addReloadAllAppTabsToTabContextCheckbox) {
			addReloadAllAppTabsToTabPrefNew = !addReloadAllAppTabsToTabPrefNew;
		} else if (eventSourceCheckbox == addReloadAllSavedToTabContextCheckbox) {
			addReloadAllSavedToTabPrefNew = !addReloadAllSavedToTabPrefNew; // since the state hasn't toggled yet
		} else if (eventSourceCheckbox == addSelectionPopupToTabContextCheckbox) {
			addSelectionPopupToTabContextPrefNew = !addSelectionPopupToTabContextPrefNew;
		} else if (eventSourceCheckbox == addStopAllToTabContextCheckbox) {
			addStopAllToTabContextPrefNew = !addStopAllToTabContextPrefNew;
		} 
		
		addToTabContextCheckbox.checked = addReloadAllAppTabsToTabPrefNew && addReloadAllSavedToTabPrefNew &&  addSelectionPopupToTabContextPrefNew && addStopAllToTabContextPrefNew;

	}
}

 function save() {
	if (1)
	{
		 savePreferences();
	}
 }

 function savePreferences() {
	              var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefBranch);
				  
 }


 