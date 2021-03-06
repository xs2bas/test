/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2017 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#import "TiViewProxy.h"

@interface TiUIAlertDialogProxy : TiViewProxy {
@private
    UIAlertController* alertController;
    BOOL persistentFlag;
    int cancelIndex;
    int destructiveIndex;
    int preferredIndex;
    int style;
}

-(void)show:(id)args;
-(void)hide:(id)args;

@end
